import React, { Component } from 'react'

declare global {
  interface Window { payhere: any }
}

export interface PayHereButtonProps {
  sandbox?: boolean,
  merchant_id?: string,
  order_id?: string,
  items?: string,
  amount?: number,
  currency?: string,
  first_name?: string,
  last_name?: string,
  email?: string,
  phone?: string,
  address?: string,
  city?: string,
  country?: string,
  onCompleted?: Function,
  onDismissed?: Function,
  onError?: Function,
  style?: object,
  options?: PayHereOption,
  onButtonReady?: Function,
  buttonDescription?: string
}

export interface PyaHereButtonState {
  isSdkReady: boolean
}

export interface PayHereOption {
  return_url?: string,
  cancel_url?: string,
  notify_url?: string,
  delivery_address?: string,
  delivery_city?: string,
  delivery_country?: string,
  custom_1?: string,
  custom_2?: string,
  hash?: string,
}

class PayHereButton extends Component<PayHereButtonProps, PyaHereButtonState> {
  static defaultProps: PayHereButtonProps = {
    sandbox: false,
    buttonDescription: 'Pay Here',
    style: {
      backgroundColor: '#1a1aff',
      border: 'none',
      color: 'white',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '32px 16px',
      cursor: 'pointer',
      padding: '10px 34px',
      borderRadius: '4px'
    },
    currency: 'LKR',
  }

  constructor(props: PayHereButtonProps) {
    super(props);

    this.state = {
      isSdkReady: false,
    };
  }

  componentDidMount() {
    if (typeof window !== "undefined" &&
      window !== undefined &&
      window.payhere === undefined) {
      this.addPayHereSdk();
    }
    else if (typeof window !== "undefined" &&
      window !== undefined &&
      window.payhere !== undefined &&
      this.props.onButtonReady) {
      this.props.onButtonReady();
    }
  }

  onClick = () => {
    const {
      sandbox,
      merchant_id,
      order_id,
      items,
      amount,
      currency,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
      options } = this.props;

    let payment = {
      sandbox,
      merchant_id,
      order_id,
      items,
      amount,
      currency,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
    }

    if (options != undefined)
      Object.assign(payment, options)
    console.log(payment)
    this.initCallBack();

    window.payhere.startPayment(payment);
  }

  render() {

    const { style, buttonDescription } = this.props;
    const { isSdkReady } = this.state;

    console.log(this.props)

    if (!isSdkReady && (typeof window === "undefined" || window.payhere === undefined)) {
      return null;
    }

    return (
      <button
        style={style}
        onClick={this.onClick} > {buttonDescription} </button >
    );
  }

  private addPayHereSdk() {
    const { onButtonReady } = this.props;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.payhere.lk/lib/payhere.js`;
    script.async = true;
    script.onload = () => {
      this.setState({ isSdkReady: true });

      if (onButtonReady) {
        onButtonReady();
      }
    };
    script.onerror = () => {
      throw new Error("PayHere SDK could not be loaded.");
    };
    document.body.appendChild(script);
  }

  private initCallBack() {
    const { onCompleted, onDismissed, onError } = this.props;
    if (onCompleted !== undefined) {
      window.payhere.onCompleted = this.props.onCompleted
    }

    if (onDismissed != undefined) {
      window.payhere.onDismissed = this.props.onDismissed
    }

    if (onError != undefined) {
      window.payhere.onError = this.props.onError
    }
  }
}

export { PayHereButton }
