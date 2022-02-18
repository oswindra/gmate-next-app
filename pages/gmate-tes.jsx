import connect from "../lib/database"
import {
    objectify,
    getTestSequence,
    randomGroupKeys,
    groupByKey

} from "gmate"
import CetakSoal from "../components/cetak-soal"
import { useEffect, useState } from "react"

export default function Gmate ({ 
    dfSoal,
    leaders,
    soalByKey,
    sekuen,
    kondisiByKey
}) {
    const [index, setIndex] = useState (0)
    const [seq, setSeq] = useState (sekuen[0])
    
    useEffect (()=>{
        setSeq (sekuen[index])
    }, [index, setSeq])

    function next (e) {
        if (index == 44) setIndex (0)
        else setIndex (index+1)
    }

    function back (e) {
        if (index == 0) return
        setIndex (index-1)
    }


    return (
        <div style={{
            padding: '1rem', 
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#f0f0f0'
        }}>
            <h1>Tes Gmate {dfSoal.length} - {index+1} - {seq}</h1>

            <div>
                <CetakSoal 
                    soal={soalByKey[seq]}
                    kondisi={kondisiByKey[soalByKey[seq].ref]}
                />
            </div>

            <button 
                 style={{
                    background: "red"
                }}
                onClick={back}
            >Back</button>

            <button 
                 style={{
                    background: "green"
                }}
                onClick={next}
            >Next</button>

            


        </div>
    )
}

export const getServerSideProps = async () => {
    const db = await connect ()
    const rs = await db.all ('SELECT * FROM soal')
    console.log (rs);

    const rs2 = await db.get('SELECT leader FROM meta')
    console.log (rs2);

    const leaders = rs2.leader.split(' ')
    console.log (leaders);

    const soalByKey = objectify(rs)
    console.log(soalByKey);

    const sekuen = getTestSequence(rs, leaders)
    console.log(sekuen);

    const groupKeys = randomGroupKeys (groupByKey(rs), leaders)
    console.log(groupKeys);

    const rs3 = await db.all("SELECT * from kondisi")
    // console.log(rs3);

    const kondisiByKey = objectify (rs3)
    console.log(kondisiByKey);

    return {
        props:{
            dfSoal: rs,
            leaders,
            soalByKey,
            sekuen,
            kondisiByKey
        }
    }
}