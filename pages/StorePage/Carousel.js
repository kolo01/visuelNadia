import { useState } from "react";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Carousel({ slides }) {
    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, magni at voluptatibus rerum vel quisquam eaque vero? Facilis vel, impedit magnam laudantium quia consectetur, alias, ab quos a doloremque illum.</p>
        // <div className="overflow-hidden relative">
        //     <div className={`flex transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)`,}}>
        //         {slides && slides !="" ? slides.map((slide) => {
        //             return <img src={slide} />;
        //         }):<p>Cool</p>}
        //     </div>

        //     <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        //         <button onClick={previousSlide}>
        //             <BsFillArrowLeftCircleFill />
        //         </button>
        //         <button onClick={nextSlide}>
        //             <BsFillArrowRightCircleFill />
        //         </button>
        //     </div>

        //     <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        //         {slides.map((s, i) => {
        //             return (
        //                 <div onClick={() => { setCurrent(i)}} key={"circle" + i} className={`rounded-full cursor-pointer  ${ i === current ? "bg-white" : "bg-gray-500" }`}></div>
        //             );
        //         })}
        //     </div>
        // </div>
    );
}


<ol class="flex items-center w-full">
    <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
        <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
        </span>
    </li>
    <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
        <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
    </li>
    <li class="flex items-center w-full">
        <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
        </span>
    </li>
</ol>


{/* <ol class="css-1i9dniz">
    <li aria-label="Sélection de service" role="button" aria-disabled="false" class="css-dvmvvo">
        <span class="css-1fvdmpf"></span>
        <span class="css-1rc5pa4">Sélection de service</span>
    </li>
    <li aria-label="Détails de l’expédition" role="button" aria-disabled="true" class="css-6bjjk5">
        <span class="css-p0f4v9"></span>
        <span class="css-1265lly">Détails de l’expédition</span>
    </li>
    <li aria-label="Détails de l’adresse" role="button" aria-disabled="true" class="css-6bjjk5">
        <span class="css-p0f4v9"></span>
        <span class="css-1265lly">Détails de l’adresse</span>
    </li>
    <li aria-label="Détails de paiement" role="button" aria-disabled="true" class="css-6bjjk5">
        <span class="css-p0f4v9"></span>
        <span class="css-1265lly">Détails de paiement</span>
    </li>
</ol> 

.css-1i9dniz {
    position: relative;
    counter-reset: item 0;
    display: table;
    list-style: none;
    table-layout: fixed;
    width: 100%;
    padding: 0px;
    margin: 0px;
}
ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}


@media (min-width: 768px)
<style>
.css-6bjjk5 {
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: 600;
    letter-spacing: 0.05em;
}

.css-6bjjk5 {
    font-size: 0.75rem;
    line-height: 1.66667;
    letter-spacing: 0.05em;
    cursor: pointer;
    display: table-cell;
    vertical-align: top;
    padding-right: 8px;
    height: 48px;
    font-weight: 600;
    pointer-events: none;
    color: rgb(112, 111, 111);
}
*/}