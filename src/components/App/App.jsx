import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import getImages from 'components/API/Api';
import { LoadMore } from '../LoadMore/LoadMore';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Container } from './App.styled';

export const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [inquiry, setInquiry] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (inquiry === '') {
      return;
    }
    setShowLoader(true);
    const response = getImages(inquiry, page);
    response.then(res => {
      if (res.data.hits.length === 0) {
        toast.error('Nothing was found');
      }
      setImages(prevState => [...prevState, ...res.data.hits]);
      setShowLoader(false);
    });
  }, [inquiry, page]);

  const onLoadMore = e => {
    e.preventDefault();
    setPage(page + 1);
  };

  const formSubmit = message => {
    setInquiry(message);
    setImages([]);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModal = index => {
    setShowModal(true);
    setModalImg(images[index].largeImageURL);
  };

  return (
    <div>
      <Searchbar onSubmit={formSubmit} />
      {showLoader && <Loader />}
      {images.length ? (
        <Container>
          <ImageGallery images={images} handleModal={handleModal} />
          {images.length !== 0 && <LoadMore onLoadMore={onLoadMore} />}
        </Container>
      ) : (
        <></>
      )}
      {showModal && <Modal onClose={toggleModal} modalImg={modalImg} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
