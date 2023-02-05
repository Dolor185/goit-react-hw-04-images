import { useState } from 'react';
import { Container, Form, Input, Button } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/icons8-search.svg';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [inquiry, setInquiry] = useState('');

  const handeSubmit = e => {
    e.preventDefault();

    if (inquiry.trim() === '') {
      toast.error('Empty request! Please fill in the search field. ');
      return;
    }

    onSubmit(inquiry);
    setInquiry('');
  };

  const handleChange = e => {
    setInquiry(e.currentTarget.value);
  };

  return (
    <Container>
      <Form onSubmit={handeSubmit}>
        <Button type="submit">
          <SearchIcon />
        </Button>

        <Input
          onChange={handleChange}
          value={inquiry}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Container>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
