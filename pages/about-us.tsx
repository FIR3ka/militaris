import Template from "@/app/template_blog/template"

export default function About(){
    return(

        <Template>
            <div className="items-center">
                <div className='lg:pt-[8em] pt-[3em] lg:w-[900px] mx-auto min-h-screen px-[1.1em] lg:px-[0] pb-[2em]'>
                    <div>
                        <div>
                            <h3 className="mdx-h2 ">Divulgazione Storica</h3>
                            <p className="mdx-p text-stone-800 mt-1">Approfondire e raccontare le vicende militari che hanno segnato la storia, analizzando battaglie, strategie, personaggi e innovazioni tecnologiche.</p>
                        </div>
                        <div>
                            <h3 className="mdx-h2">Analisi Tecnica</h3>
                            <p className="mdx-p text-stone-800 mt-1">Offrire uno sguardo dettagliato sui mezzi militari dagli aerei ai carri armati, dalle navi da guerra alle armi individuali esaminandone sviluppo, caratteristiche e impatto sui conflitti.</p>
                        </div>
                        <div>
                            <h3 className="mdx-h2">Confronto con il Presente</h3>
                            <p className="mdx-p text-stone-800 mt-1">Mettere in relazione gli eventi storici con il mondo contemporaneo, mostrando come la storia militare influenzi ancora oggi dottrine, geopolitica e innovazione tecnologica.</p>
                        </div>
                        <div>
                            <h3 className="mdx-h2">Approccio Coinvolgente</h3>
                            <p className="mdx-p text-stone-800 mt-1">Scrivere articoli che non siano semplici elenchi di date e fatti, ma racconti appassionanti e immersivi, capaci di coinvolgere il lettore e stimolare la discussione.</p>
                        </div>
                        <div>
                            <h3 className="mdx-h2">Comunità e Interazione</h3>
                            <p className="mdx-p text-stone-800 mt-1">Creare uno spazio di confronto per appassionati e studiosi di storia militare, favorendo il dibattito, la condivisione di conoscenze e il rispetto per la complessità degli eventi trattai.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="mdx-h2">Chi siamo</h2>
                        <p className="mdx-p text-stone-800 mt-1">Siamo due appassionati di storia militare che hanno deciso di unire le forze per creare questo blog. Da anni ci immergiamo tra libri, documentari e discussioni su strategie, battaglie, mezzi bellici e figure storiche che hanno lasciato il segno. Il nostro obiettivo? Condividere questa passione con chiunque voglia approfondire la storia militare in modo chiaro, dettagliato e, perché no, anche coinvolgente. 
                            
                            <br></br><br></br>

                            Qui troverete articoli su guerre, armi, tattiche e tutto ciò che ruota attorno al mondo militare, con un occhio sia all &apos analisi storica che alla curiosità. Non siamo accademici, ma cerchiamo di essere il più accurati possibile, senza rinunciare a uno stile accessibile e diretto.

                            <br></br><br></br>
                            Se anche voi amate la storia militare, siete nel posto giusto!</p>
                    </div>
                </div>
            </div>
        </Template>
        
    )
}