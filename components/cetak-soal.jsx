import Pilihan from "./pilihan";

export default function CetakSoal ({soal, kondisi}) {
    return  (
        <div>
            {kondisi.seq}
            <div dangerouslySetInnerHTML={{__html: kondisi.konten}}/>
            {soal.seq}
            <div dangerouslySetInnerHTML={{__html: soal.konten}}/>
            <Pilihan soal={soal}/>
        </div>
    )
}