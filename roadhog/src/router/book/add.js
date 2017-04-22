import React, { Component } from 'react';
import FormItem from '../../components/FormItem';
import HomeLayout from '../../layouts/HomeLayout'
import BookEditor from '../../components/BookEditor'

class BookAdd extends React.Component {
  render () {
    return (
      <HomeLayout title="添加图书">
        <BookEditor/>
      </HomeLayout>
    );
  }
}

export default BookAdd;