import React, { useEffect, useState }  from 'react';
import axios from 'axios';
import NewsItem from '../NewsItem/NewsItem';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from '../Spinner/Spinner';

export default function News(props) {
  
  let[page, setPage] = useState(2);
  const [data, setData] = useState({
    articles: [],
    loading: false,
    totalResults: 0
  });

  const [error, setError] = useState(null);

  useEffect(() => {
  
    setData((oldValue)=>{
      return {
        ...oldValue,
        loading: true
      }
    });

    axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?per_page=${props.per_page}&context=embed&page=${page-1}`)
      .then(response => {
        setError(null);
        setData((oldValue)=>{
          return {
            loading: false,
            articles: response.data,
            totalResults: 1000
          }
        });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 404) {
            setError('Page Not Found');
            return;
          }
        } else if (err.request) {
            console.log(err.request);
        } else {
          if(err.code === 'ERR_NETWORK'){
            setError('Network Error');
            return;
          }
          console.log('Error', err.message);
        }
      });
      
  }, []);

  const fetchMoreData = ()=> {
    setPage(page+1);
    axios.get(`https://techcrunch.com/wp-json/wp/v2/posts?per_page=${props.per_page}&context=embed&page=${page}`)
      .then(response => {
        setError(null);
        
        setData((oldValue)=>{
          return {
            ...oldValue,
            articles: data.articles.concat(response.data),
            totalResults: 1000
          }
        });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 404) {
            setError('Page Not Found');
            return;
          }
        } else if (err.request) {
           console.log(err.request);
        } else {
          if(err.code === 'ERR_NETWORK'){
            setError('Network Error');
            return;
          }
          console.log('Error', err.message);
        }
    });
  }
 
  return (
    <>
        <div className='text-center my-4'>
            <h1 >Top Headlines News</h1>
            {data.loading && <Spinner/>}
            <h3 className='mt-5'>{error ? error : ''}</h3>
            <InfiniteScroll
            dataLength={data.articles.length}
            next={fetchMoreData}
            hasMore={data.articles.length !== data.totalResults}  //true or false
            loader={<Spinner/>}
            >
              <div className="container">
              
                <div className="row my-4 d-flex justify-content-center">
                  {!data.loading && data.articles.map((value, index)=>{
                    let {id, link, title, parselyMeta, primary_category} = value;
                    return(
                        <NewsItem key={index} id={id} link={link} title={title.rendered} image={parselyMeta['parsely-image-url']} publish={parselyMeta['parsely-pub-date']} section={parselyMeta['parsely-section']} author={parselyMeta['parsely-author'][0]} description={primary_category.description}/>
                    );
                  })}
                  
                </div> 
                
              </div>
            </InfiniteScroll>
        </div>
    </>
  )
}
