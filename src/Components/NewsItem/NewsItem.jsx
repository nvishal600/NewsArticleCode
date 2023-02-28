import React from 'react';
import PropTypes from 'prop-types';
import './NewsItem.css';

export default function NewsItem(props) {
    let {link, title, image, publish, section, author, description} = props;
  return (
    <>
        <div className='col-md-4 d-flex justify-content-center '>
            <div style={{textAlign: "left",padding: "0", width: "18rem"}} className="card2 card  my-3" >
                <img style={{height: "200px", objectFit: "cover"}} className="card-img-top" src={image} alt={title} />
                <div className="card-body">
                    <h5 className="card-title" dangerouslySetInnerHTML={{ __html: title ? title.slice(0, 40)+"..." : "" }} />
                    <h6 className="card-subtitle mb-2 text-muted">{section}</h6>
                    <p className="card-text">{description ? description.slice(0, 80)+"..." : ""}</p>
                    <a rel="noreferrer" href={link} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    <p className="card-text">
                        <small className="text-muted">By {author} on {new Date(publish).toGMTString()}</small>
                    </p>
                </div>
            </div>

        </div>
    </>
  )
}

NewsItem.propTypes = {link: PropTypes.string.isRequired, title: PropTypes.string.isRequired, image: PropTypes.string.isRequired, publish: PropTypes.string.isRequired, section: PropTypes.string.isRequired, author: PropTypes.string.isRequired, description: PropTypes.string.isRequired};

NewsItem.defaultProps = {author: "Unknown"};
