import { ModeToggle } from "./ui/toggle-mode";

const Navbar = () => {
    return ( 
        // <div className="w-full fixed flex justify-center items-center mt-0">
            <div className=" m-4 min-w-[50%] rounded-3xl justify-between gap-6 flex items-center shadow-md">
                <h1 className="w-1/3 mx-4 text-start text-xl">Novan</h1>
                <div className="w-1/3 mx-4 flex items-center justify-center gap-12">
                    <div className="text-l"><a href="/grafik">Grafik</a></div>
                    <div className="text-l"><a href="/table">Status Sensor</a></div>
                </div>
                <div className="w-1/3 mx-4 flex items-center justify-end gap-4">
                    <ModeToggle/>
                </div>
            </div>
        // </div>
    );
}
 
export default Navbar;