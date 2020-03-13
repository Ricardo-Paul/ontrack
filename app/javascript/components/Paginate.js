import React from 'react'

export default function Paginate({totalDays, dayPerPage, setPageNumber}) {

    const generatePageNumber = () => {
        let pageNumber = []
        for (let i = 1; i <= Math.ceil(totalDays / dayPerPage); i++){
            pageNumber.push(i)
        }
        return pageNumber
    }

    let pageNumber = generatePageNumber()
    return (
        <nav>
            {pageNumber.map( page => {
                return(
                    <button 
                    key={page} 
                    className="page-button" 
                    onClick={() => setPageNumber(page)} 
                    > 
                    {page} 
                    </button>
                )
            })}
        </nav> 
    )
}
