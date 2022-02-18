export default function Pilihan ({soal}){
    const daftar = [

        // soal.a, soal.b, soal.c, soal.d, soal.e
        {seq:"a", text: soal.a},
        {seq:"b", text: soal.b},
        {seq:"c", text: soal.c},
        {seq:"d", text: soal.d},
        {seq:"e", text: soal.e},

    ]

    return (

        // <pre>{JSON.stringify(soal.a, null, 2)}</pre>

        <ol style={{
            listStyleType: "upper-alpha"
        }}>
            {daftar.sort( () => Math.random() -0.5 ).map(d => (
                <li seq={d.seq}>
                <div dangerouslySetInnerHTML={{__html: d.text}}/>
                </li>
            ))}
        </ol>
    )
}