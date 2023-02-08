import { getDatabase, onValue, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BATCH_REF_NAME } from "../api/databaseRef";
import { IBatch } from "../types/batch.types";
export default function useGetBatch() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [data, setData] = useState<IBatch[]>([]);
  const db = getDatabase();

  useEffect(() => {
    async function fetchData() {
      //databse related works

      const dataQuery = query(ref(db, BATCH_REF_NAME));
      try {
        setError(false);
        setLoading(true);
        //request firebase database;
        onValue(dataQuery, (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            const dataSnapshot = snapshot.val();
            let dataList: IBatch[] = [];
            for (const id in dataSnapshot) {
              dataList.push({ key: id, ...dataSnapshot[id] });
            }
            setData((prevCashout) => {
              return [...dataList];
            });
          }
        });
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, []);

  return { loading, error, data: data };
}
