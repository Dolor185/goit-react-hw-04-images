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
  const [status, setStatus] = useState('idle');
  const [inquiry, setInquiry] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (inquiry === '') {
      return;
    }
    console.log('initial');
    setStatus('pending');
    const response = getImages(inquiry, page);
    response.then(res => {
      if (res.data.hits.length === 0) {
        toast.error('Nothing was found');
      }
      setImages([...images, ...res.data.hits]);
      setStatus('resolved');
      setTimeout(() => {
        window.scrollTo(0, 10000);
      }, 0);
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
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <Container>
          <ImageGallery images={images} handleModal={handleModal} />
          {images.length !== 0 && <LoadMore onLoadMore={onLoadMore} />}
        </Container>
      )}
      {showModal && <Modal onClose={toggleModal} modalImg={modalImg} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
