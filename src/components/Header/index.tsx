import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex flex-col lg:flex-row">
            <div id="container" className="flex flex-col lg:flex-row items-center w-full border-b border-gray-200 shadow-md bg-white">
                <div className="bg-gray-200 w-full lg:w-auto flex justify-center lg:justify-start">
                    <Link href="/">
                        <p className="text-white p-4 lg:p-8 text-4xl text-orange-400"><b>A R K</b></p>
                    </Link>
                </div>
                <div className="mt-4 lg:mt-0 w-full lg:w-auto flex justify-center lg:justify-start">
                    <nav>
                        <ul className="flex lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 mx-5">
                            <li className="hover:text-orange-500 text-xl text-black"><Link href="/buffets">BUFFETS</Link></li>
                            <li className="hover:text-orange-500 text-xl text-black"><Link href="/decoracoes">DECORAÇÕES</Link></li>
                            <li className="hover:text-orange-500 text-xl text-black"><Link href="/eventos">EVENTOS</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
