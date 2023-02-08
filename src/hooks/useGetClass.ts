import { IClass } from "./../types/class.types";
import { onValue, query } from "firebase/database";
import { useEffect, useState } from "react";
import { classRef } from "../api/databaseRef";
export default function useGetClass() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [data, setData] = useState<IClass[]>([]);
  useEffect(() => {
    async function fetchData() {
      //databse related works

      const dataQuery = query(classRef);
      try {
        setError(false);
        setLoading(true);
        //request firebase database;
        onValue(dataQuery, (snapshot) => {
          setLoading(false);
          if (snapshot.exists()) {
            const dataSnapshot = snapshot.val();
            let dataList: IClass[] = [];
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
