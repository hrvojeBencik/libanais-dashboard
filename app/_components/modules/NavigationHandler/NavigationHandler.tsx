// "use client";
// import { useState, useEffect } from "react";
// import SidebarHandler from "../Sidebar/SidebarHandler";
// import Banner from "../../elements/Banner/Banner";
// import MobileBanner from "../../elements/Banner/MobileBanner";
// interface NavigationHandlerProps {
//     children: React.ReactNode;
// }

// const NavigationHandler = ({ children }: NavigationHandlerProps) => {
//     const SCREEN_WIDTH_LIMIT_FOR_MOBILE = 990;

//     const [isMobile, setIsMobile] = useState(false);

//     const controlNavbarOnResize = () => {
//         const width = window.innerWidth;
//         if (width < SCREEN_WIDTH_LIMIT_FOR_MOBILE) {
//             setIsMobile(true);
//         } else {
//             setIsMobile(false);
//         }
//     };

//     useEffect(() => {
//         window.addEventListener("resize", controlNavbarOnResize);

//         //Needed to show/hide links on initial site load
//         controlNavbarOnResize();

//         return () => {
//             window.removeEventListener("resize", controlNavbarOnResize);
//         };

//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return (
//         <div className={`${isMobile ? "flex-col" : "flex"}`}>
//             <SidebarHandler isMobile={isMobile}>
//                 <div className="w-full">
//                     {isMobile ? <MobileBanner /> : <Banner />}
//                     <div className=" py-[40.5px] pl-[50px] pr-6 sm:px-4 sm:py-6 ">
//                         {children}
//                     </div>
//                 </div>
//             </SidebarHandler>
//         </div>
//     );
// };

// export default NavigationHandler;
