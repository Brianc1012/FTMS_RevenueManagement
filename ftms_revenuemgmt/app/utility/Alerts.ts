import Swal from 'sweetalert2';

//--------------------ADD REVENUE RECORD-------------------//
export const showEmptyFieldWarning = () => {
  return Swal.fire({
    icon: 'warning',
    text: 'Please fill out all fields.',
    confirmButtonColor: '#961C1E',
    background: 'white',
  });
};

export const showInvalidCategoryAlert = () => {
    return Swal.fire({
      icon: 'error',
      title: 'Invalid Category',
      text: 'Please select a valid category.',
      confirmButtonColor: '#961C1E',
      background: 'white',
    });
  };
  
  export const showInvalidSourceAlert = () => {
    return Swal.fire({
      icon: 'error',
      title: 'Invalid Source',
      text: 'Source must be 3-50 alphabetic characters.',
      confirmButtonColor: '#961C1E',
      background: 'white',
    });
  };
  
  export const showInvalidAmountAlert = () => {
    return Swal.fire({
      icon: 'error',
      title: 'Invalid Amount',
      text: 'Amount must be a positive number.',
      confirmButtonColor: '#961C1E',
      background: 'white',
    });
  };
  

export const showAddConfirmation = () => {
  return Swal.fire({
    title: 'Confirmation',
    html: `<p>Are you sure you want to <b>ADD</b> this record?</p>`,
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    background: 'white',
    confirmButtonColor: '#13CE66',
    cancelButtonColor: '#961C1E',
  });
};

export const showAddSuccess = () => {
  return Swal.fire({
    icon: 'success',
    title: 'Added!',
    text: 'Your revenue record has been added.',
    confirmButtonColor: '#961C1E',
    background: 'white',
  });
};


//-----------------------ADD EXPENSE RECORD---------------------//

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    confirmButtonColor: '#961C1E',
    background: 'white',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

export const showError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#961C1E',
    background: 'white',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};



