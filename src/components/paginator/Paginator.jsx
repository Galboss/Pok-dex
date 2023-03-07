import React, { useEffect, useState } from 'react';
import './Paginator.css';
import usePokemonContext from '../../hooks/pokemon_context/usePokemonContext';

function Paginator() {
    const {currentPage, setCurrentPage,pokemonCount}=usePokemonContext();
    const [paginator, setPaginator] = useState(null);
    useEffect(() => {
        setPaginator(paginate(pokemonCount, currentPage))
    }, [currentPage,pokemonCount])
    useEffect(() => {
        let paginatorButtons = document.querySelectorAll('.paginator-page-button');
        let controls = document.querySelectorAll('.paginator-controller');
        if (paginatorButtons.length > 0)
            for (const element of paginatorButtons)
                element.addEventListener('click', handleClickPaginatorBtn);
        if (controls.length > 0)
            for (const control of controls)
                control.addEventListener('click', handleClickControls);
        return () => {
            if (paginatorButtons.length > 0)
                for (const element of paginatorButtons)
                    element.removeEventListener('click', handleClickPaginatorBtn);
            if (controls.length > 0)
                for (const control of controls)
                    control.removeEventListener('click', handleClickControls);
        }

    }, [paginator])
    function settingCurrentPageEvent(element) {
        if (element.classList.contains('current-page')) return;
        let index = parseInt(element.getAttribute('page'));
        setCurrentPage(index);
    }
    function handleClickPaginatorBtn() {
        settingCurrentPageEvent(this);
    }
    function settingControlsPaginator(element) {
        let type = element.getAttribute('control');
        if (type == 'prev') setCurrentPage(currentPage-1);
        else setCurrentPage(currentPage+1);
    }
    function handleClickControls() {
        settingControlsPaginator(this);
    }
    function paginate(totalElements, currentPage) {
        const elementsPerPage = 40;
        const totalPages = Math.ceil(totalElements / elementsPerPage);
        const maxVisiblePages = 3;

        const pages = [];

        // Add previous button
        if (currentPage > 1) {
            pages.push(
                <button key="prev" control="prev" className='paginator-button paginator-controller'>
                    {'< Previous'}
                </button>
            );
        } else {
            pages.push(<button key="prev-disabled" className='paginator-button paginator-controller' disabled>{'< Previous'}</button>);
        }

        // Add first page
        if (currentPage > 3) {
            pages.push(<button key="1" page={1} className='paginator-button paginator-page-button'>1</button>);
            if (currentPage > 4) {
                pages.push(<span key="1-spacer" className='txt-color'>...</span>);
            }
        }

        // Calculate visible pages
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
        }

        // Add visible pages
        for (let page = startPage; page <= endPage; page++) {
            const isActive = page == currentPage;
            pages.push(
                <button key={page} page={page} className={`paginator-button paginator-page-button ${isActive ? 'current-page' : ''}`}>
                    {page}
                </button>
            );
        }

        // Add last page
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                pages.push(<span key="last-spacer" className='txt-color'>...</span>);
            }
            pages.push(<button key={totalPages} page={totalPages} className='paginator-button paginator-page-button'>{totalPages}</button>);
        }

        // Add next button
        if (currentPage < totalPages) {
            pages.push(
                <button key="next" control="next" className='paginator-button paginator-controller'>
                    {'Next >'}
                </button>
            );
        } else {
            pages.push(<button key="next-disabled" className='paginator-button paginator-controller' disabled>{'Next >'}</button>);
        }

        return <div className="paginator-container">{pages}</div>;
    }

    return (
        <>
            {paginator != null ? paginator : ''}
        </>
    )
}

export default Paginator