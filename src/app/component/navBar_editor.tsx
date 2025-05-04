import Link from "next/link"
import router from "next/router";

export function go(url : any){
    router.push(url);
}

export async function createNew(){

    const response = await fetch('/api/article_create')

    const data = await response.json()

    const converted = JSON.parse(JSON.stringify(data));

    const url = "/editor/"+ converted[1].index;

    go(url);
}

const Header = () => {
    return (
        <div className="justify-center flex bg-black-noise text-white-noise">
        <div className="container">
            <ul className="py-[3.3em] px-[1.1em] flex ">
                <li className="flex mr-[1em]"><Link className="m-auto" href={"/dashboard"}>Gestione</Link></li>
                <li><Link onClick={createNew} href={""}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg></Link></li>
            </ul>
        </div>
    </div>
    )
}

export default Header;