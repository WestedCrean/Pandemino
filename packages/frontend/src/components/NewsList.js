import React, { Fragment, useEffect, useState } from "react"
import { useAuthContext } from "services/auth"
import ApiService from "services/api"



const NewsList = () => {
    const [news, setNews] = useState([])

    const { accessToken } = useAuthContext()


    const courseComponent = (news) => {

        return (
            <div className="news-wrapper"> 
                <div className="news-data">
                    {setDate(news.createdAt)}
                </div>

                <div className="news-body">
                    Użytkownik {news.lecturer.email} dodal kurs {news.name} 
                </div>
            </div>
        )
    }

    const lectureComponent = (news) => {
        return(
            <div className="news-wrapper">
                <div className="news-data">
                    {setDate(news.createdAt)}
                </div>
                <div className="news-body">
                Dodano wyklad {news.name} do kursu {news.course.name}
                </div>
            </div>

        )
    }

    //formating data
    const setDate = (props) => {
        const date = props.slice(0, 10);
        const time = props.slice(11, 19);
        return date + " " + time;
      };

    ///Concat arrays
    function flatMap(array, fn) {  
        return array.reduce((newArray, el) => [...newArray, ...fn(el)], [])
    }

    Array.prototype.sortBy = function(p) {
        return this.slice(0).sort(function(a,b) {
          return (a[p] < b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
        });
      }

    const getStreams = async () => {

        const streamsRepository = ApiService(accessToken).streams
        try {
            const response = await streamsRepository.getAvailableCourses()
            const response2 = await streamsRepository.getLectures()

            const list = flatMap([response.data, response2.data], x => x).sortBy('createdAt').slice(0,7)

            setNews(list);

        } catch (error) {
            console.error({ error })
        }
    }

    useEffect(() =>{
        getStreams()
    },[])


    return (
        <div>
            <table class="table">
                <tbody>


                {news.map((singleNews) => (


                    <tr>
                        {singleNews.lecturer == null ? lectureComponent(singleNews) : courseComponent(singleNews)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default NewsList