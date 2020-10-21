import { writable } from 'svelte/store';

export let errors = writable(null);
export let saving = writable(false);
export let success = writable(null);

const wait = ms => new Promise(res=>setTimeout(res,ms))
export const save = async (form) => {


  if (form.phoneNumber === '' || isNaN(Number(form.phoneNumber))){
    errors.set({phoneNumber : 'شماره موبایل وارد شده صحیح نمیباشد'})
    return
  }

  saving.set(true);
//   errors.set(null);
  console.log('requesting ...' ,form)
  await wait(2000)
  console.log('recived ...')

  saving.set(false)
//   const response = await api.post('product', form);


//   if (response.status >= 400) {
//     saving.set(false);
//     errors.set(response.data.errors);
//     return;
//   }

//   success.set(response.data.message);
//   order.set(response.data.data);

//   saving.set(false);
};
