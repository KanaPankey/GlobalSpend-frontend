// icons
import { RiMailAddFill } from 'react-icons/ri';
import { MdAddBusiness } from 'react-icons/md';
import { BsCurrencyExchange } from 'react-icons/bs';


function RenderFooter() {
  return(
    <div className="footer">
      <RiMailAddFill className="footer-icon"/> 
      <MdAddBusiness className="footer-icon"/> 
      <BsCurrencyExchange className="footer-icon"/> 
    </div>
  )
}

export default RenderFooter;