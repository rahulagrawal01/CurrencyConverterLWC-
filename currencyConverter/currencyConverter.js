import { LightningElement, track } from 'lwc';
import getconversion from '@salesforce/apex/currencyConverterController.getConversion';
import getCodes from '@salesforce/apex/currencyConverterController.getCodes';
export default class CurrencyConverter extends LightningElement 
{
    track convertFrom='';
    @track convertTo='';
    @track amount='';
    @track result='';
    codes;
    valueFrom = '';
    valueTo = '';
    options=[];
    
    @wire(getCodes,{})
    wiredData({ error, data }) {
      if (data) {
            try{
                this.codes = data;
                console.log('data-->', this.codes)
                let option = [];
                var keys = Object.keys(data);
                keys.forEach(currentItem => {
                    var obj = {};
                    obj['label'] = data[currentItem]['description'];
                    obj['value'] = currentItem;
                    option.push(obj);
                });
                this.options = option;
            }
            catch (error) {
                console.error('check error here', error);
            }
        
      } else if (error) {
        console.error('Error:', error);
      }
    }
    
    //getting conversions from apex
    handleClick
    {
        getconversion({amount:this.amount,convertFrom: this.convertFrom, convertTo: this.convertTo})
        .then((res) => {
            this.result = res.toString()
            console.log(this.result);
        }).catch((err) => {
            console.log(err);
        });
    }

    handleFromChange(event)
    {
        console.log(event.target.value)
        this.convertFrom = event.target.value;
    }
    //cpturing input fields
    handleToChange(event)
    {
        console.log(event.target.value)
        this.convertTo = event.target.value;
    }

    handleAmountChange(event)
    {
        console.log(event.target.value)
        amount = event.target.value;
    }

    handleClear()
    {
        this.amount = '';
        this.convertFrom = '';
        this.convertTo = '';
        this.result = '';
    }

    handleChange(event)
    {
        this.value = event.target.value;
        console.log(this.value); // checking if the value is getting updated or not
    }
}
