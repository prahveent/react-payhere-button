# react-payhere-button

> PayHere button component for react

[![NPM](https://img.shields.io/npm/v/react-payhere-button.svg)](https://www.npmjs.com/package/react-payhere-button) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-payhere-button
```

## Usage

```tsx
import React, { Component } from 'react'

import { PayHereButton } from 'react-payhere-button'

class Example extends Component {
  render() {
    const onSucess = (orderId: number) => console.log('onSuccess', orderId);
    const onDismissed = () => console.log('onDismissed');
    const onError = (error: Object) => console.log('onError', error);

    return <PayHereButton
      sandbox={true}
      merchant_id={'1214560'}
      onCompleted={onSucess}
      onDismissed={onDismissed}
      onError={onError}
      order_id={'ItemNo12345'}
      items={'Door bell wireles'}
      amount={100}
      currency={'LKR'}
      first_name={'Prahveen'}
      last_name={'Thiruchelvam'}
      email={'prahveent@gmail.com'}
      phone={'0771234567'}
      address={'No.1, Galle Road'}
      city={'Colombo'}
      country={'Sri Lanka'}
      options={{
        delivery_address: 'No. 123, Galle road, Colombo 03',
        delivery_city: 'Kollupitiya',
        delivery_country: 'Sri Lanka',
        custom_1: '',
        custom_2: '',
        return_url: 'http://sample.com/return',
        cancel_url: 'http://sample.com/cancel',
        notify_url: 'http://sample.com/notify',
      }}
    />
  }
}
```

## License

MIT © [Prahveen Thiruchelvam (prahveent@gmail.com)](https://github.com/prahveent))
