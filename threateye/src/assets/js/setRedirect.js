
export function setRedirect(per) {


  let redirect = '/404';

  if (per.includes('1')) {

    if(per.includes('11')){
      redirect = '/home/overview';
    }else if(per.includes('12')){
      redirect = '/home/screen';
    }
  //处置
  }else if(per.includes('2')){

    if(per.includes('21')){
      redirect = '/handle/assets';
    }else if(per.includes('22')){

      if(per.includes('221')){
        redirect = '/handle/risks/outside';
      }else if(per.includes('222')){
        redirect = '/handle/risks/local';
      }

    }else if(per.includes('23')){
      redirect = '/handle/works';
    }

  }else if(per.includes('3')){

    if(per.includes('31')){
      redirect = '/emerge/network';
    }else if(per.includes('32')){
      redirect = '/emerge/terminal';
    }else if(per.includes('33')){
      redirect = '/emerge/journal';
    }

  }else if(per.includes('4')){

    if(per.includes('41')){
      redirect = '/invest/dns';
    }else if(per.includes('42')){
      redirect = '/invest/url';
    }else if(per.includes('43')){
      redirect = '/invest/host';
    }else if(per.includes('44')){
      redirect = '/invest/user';
    }else if(per.includes('45')){
      redirect = '/invest/file';
    }else if(per.includes('46')){
      redirect = '/invest/sign';
    }else if(per.includes('47')){
      redirect = '/invest/data';
    }else if(per.includes('48')){
      redirect = '/invest/flow';
    }else if(per.includes('49')){
      redirect = '/invest/ioc';
    }

  }else if(per.includes('5')){

    if(per.includes('51')){
      redirect = '/report/create';
    }else if(per.includes('52')){
      redirect = '/report/sending';
    }

  }else if(per.includes('6')){

    if(per.includes('61')){
      redirect = '/system/manage';
    }else if(per.includes('62')){
      redirect = '/system/monitor';
    }else if(per.includes('63')){
      redirect = '/system/account';
    }else if(per.includes('64')){
      redirect = '/system/electric';
    }else if(per.includes('65')){
      redirect = '/system/option';
    }else if(per.includes('66')){
      redirect = '/system/rule';
    }else if(per.includes('67')){
      redirect = '/system/react';
    }else if(per.includes('68')){
      redirect = '/system/threat';
    }else if(per.includes('69')){
      redirect = '/system/record';
    }else if(per.includes('610')){
      redirect = '/system/resume';
    }else if(per.includes('611')) {
      redirect = '/system/licence';
    }
  }
  return redirect;
}
