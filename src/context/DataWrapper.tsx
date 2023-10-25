import { IBasicInfo, IBatch, IResult, IResultShit } from "../types/batch.types";
import { IClass } from "../types/class.types";
import "../../firebase";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { ROOT_API_REF_NAME } from "../api/databaseRef";
import { INotice, IStudent, ITeacher } from "../types/student.types";
import { ISlider } from "../types/slider.types";
import { IActivity, IContact, IOnlineAdmit } from "../types/user.types";

interface IWraperContextContainer {
  classList: IClass[];
  batchList: IBatch[];
  studentList: IStudent[];
  teacherList: ITeacher[];
  noticeList: INotice[];
  sliderImageList: ISlider[];
  activityList: IActivity[];
  contactList: IContact[];
  onlineAdmitList: IOnlineAdmit[];
  resultShitList: IResultShit[];
  basicInfo: IBasicInfo | null;
  resultList: IResult[];
  loading: boolean;
}

const WrapperContext = React.createContext<IWraperContextContainer>({
  loading: false,
  classList: [],
  batchList: [],
  studentList: [],
  teacherList: [],
  noticeList: [],
  sliderImageList: [],
  activityList: [],
  contactList: [],
  onlineAdmitList: [],
  basicInfo: null,
  resultShitList: [],
  resultList: [],
});

export function useWrapper() {
  return useContext(WrapperContext);
}
export function WrapperProvider({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [classList, setClassList] = useState<IClass[]>([]);
  const [batchList, setBatchList] = useState<IBatch[]>([]);
  const [studentList, setStudentList] = useState<IStudent[]>([]);
  const [teacherList, setTeacherList] = useState<ITeacher[]>([]);
  const [basicInfo, setBasicInfo] = useState<IBasicInfo | null>(null);
  const [noticeList, setNoticeList] = useState<INotice[]>([]);
  const [sliderImageList, setSliderImageList] = useState<ISlider[]>([]);
  const [activityList, setActivityList] = useState<IActivity[]>([]);
  const [onlineAdmitList, setOnlineAdmitList] = useState<IOnlineAdmit[]>([]);
  const [contactList, setContactList] = useState<IContact[]>([]);
  const [resultShitList, setResultShitList] = useState<IResultShit[]>([]);
  const [resultList, setResultList] = useState<IResult[]>([]);
  const db = getDatabase();
  useEffect(() => {
    async function fetchData() {
      const dataQuery = query(ref(db, ROOT_API_REF_NAME));
      try {
        //request firebase database;
        onValue(dataQuery, (snapshot) => {
          if (snapshot.exists()) {
            const dataSnapshot = snapshot.val();
            //populate batch list
            let newBatchList: IBatch[] = [];
            let newClassList: IClass[] = [];
            let newStudentList: IStudent[] = [];
            let newTeacherList: ITeacher[] = [];
            let newNoticeList: INotice[] = [];
            let newSliderImageList: ISlider[] = [];
            let newActivityList: IActivity[] = [];
            let newContactList: IContact[] = [];
            let newOnlineAdmitList: IOnlineAdmit[] = [];
            let newResultShitList: IResultShit[] = [];
            let newResultList: IResult[] = [];
            for (const id in dataSnapshot?.Batches) {
              newBatchList.push({ key: id, ...dataSnapshot?.Batches[id] });
            }
            //populate class lists
            for (const id in dataSnapshot?.ClassList) {
              newClassList.push({ key: id, ...dataSnapshot?.ClassList[id] });
            }
            //populate student lists
            for (const id in dataSnapshot?.Student) {
              newStudentList.push({ key: id, ...dataSnapshot?.Student[id] });
            }
            //populate teacher lists
            for (const id in dataSnapshot?.Teachers) {
              newTeacherList.push({ key: id, ...dataSnapshot?.Teachers[id] });
            }
            //populate notice lists
            for (const id in dataSnapshot?.Notice) {
              newNoticeList.push({ key: id, ...dataSnapshot?.Notice[id] });
            }
            //populate slider image lists
            for (const id in dataSnapshot?.SliderImage) {
              newSliderImageList.push({
                key: id,
                ...dataSnapshot?.SliderImage[id],
              });
            }
            //populate activity lists
            for (const id in dataSnapshot?.Activities) {
              newActivityList.push({
                key: id,
                ...dataSnapshot?.Activities[id],
              });
            }
            //populate online admit lists
            for (const id in dataSnapshot?.OnlineAdmit) {
              newOnlineAdmitList.push({
                key: id,
                ...dataSnapshot?.OnlineAdmit[id],
              });
            }
            //populate contact lists
            for (const id in dataSnapshot?.Contact) {
              newContactList.push({
                key: id,
                ...dataSnapshot?.Contact[id],
              });
            }
            //populate result shit lists
            for (const id in dataSnapshot?.ResultShit) {
              newResultShitList.push({
                key: id,
                ...dataSnapshot?.ResultShit[id],
              });
            }
            //populate result  lists
            for (const id in dataSnapshot?.Results) {
              newResultList.push({
                key: id,
                ...dataSnapshot?.Results[id],
              });
            }
            console.log("Here");
            console.log("Batch", newBatchList);
            setBatchList(newBatchList);
            setClassList(newClassList);
            setStudentList(newStudentList);
            setTeacherList(newTeacherList);
            setNoticeList(newNoticeList);
            setBasicInfo(dataSnapshot?.BasicInfo);
            setSliderImageList(newSliderImageList);
            setActivityList(newActivityList);
            setOnlineAdmitList(newOnlineAdmitList);
            setContactList(newContactList);
            setResultShitList(newResultShitList);
            setResultList(newResultList);
            setLoading(false);
          }
        });
      } catch (err) {
        setLoading(false);
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  const getValue = useMemo(() => {
    return {
      loading,
      classList,
      batchList,
      studentList,
      teacherList,
      noticeList,
      basicInfo,
      sliderImageList,
      onlineAdmitList,
      contactList,
      activityList,
      resultShitList,
      resultList,
    };
  }, [
    loading,
    classList,
    batchList,
    studentList,
    teacherList,
    noticeList,
    basicInfo,
    sliderImageList,
    activityList,
    onlineAdmitList,
    contactList,
    resultShitList,
    resultList,
  ]);

  return (
    <WrapperContext.Provider value={getValue}>
      {!loading && children}
    </WrapperContext.Provider>
  );
}
