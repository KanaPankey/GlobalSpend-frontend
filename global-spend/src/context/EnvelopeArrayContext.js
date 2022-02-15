import { createContext } from 'react';

const EnvelopeArrayContext = createContext({
  envelopeArray: null, 
  setEnvelopeArray: () => {}, 
});

export default EnvelopeArrayContext;