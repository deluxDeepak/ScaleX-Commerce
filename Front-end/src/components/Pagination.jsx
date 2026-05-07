import React from 'react'

/*
    - arrow to change the page 
    - direct select option 
    - show number of pages 

*/

const Pagination = ({
    totalPage,
    selectedPage,
    setSelectedPage
}) => {

    const handlePrev = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNext = () => {
        if (selectedPage < totalPage) {
            setSelectedPage(selectedPage + 1);
        }
    };

    return (
        <div className="flex items-center gap-2">

            {/* Previous */}
            <button
                onClick={handlePrev}
                disabled={selectedPage === 1}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {
                [...Array(totalPage)].map((_, index) => {

                    const page = index + 1;

                    return (
                        <button
                            key={page}
                            onClick={() => setSelectedPage(page)}
                            style={{
                                fontWeight:
                                    selectedPage === page
                                        ? "bold"
                                        : "normal"
                            }}
                        >
                            {page}
                        </button>
                    );
                })
            }

            {/* Next */}
            <button
                onClick={handleNext}
                disabled={selectedPage === totalPage}
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;