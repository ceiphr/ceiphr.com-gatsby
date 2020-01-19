// https://nehalist.io/adding-commento-to-react-apps-like-gatsby/

import React, {useEffect} from 'react';

// Helper to add scripts to our page
const insertScript = (src, id, parentElement) => {
  const script = window.document.createElement('script');
  script.async = true;
  script.src   = src;
  script.id    = id;
  parentElement.appendChild(script);

  return script;
};

// Helper to remove scripts from our page
const removeScript = (id, parentElement) => {
  const script = window.document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
};

// The actual component
const CarbonAds = ({id}) => {
  useEffect(() => {
    // If there's no window there's nothing to do for us
    if (! window) {
      return;
    }
    const document = window.document;
    // In case our #carbonads container exists we can add our carbonads script
    if (document.getElementById('carbonads__wrapper')) {
      insertScript(`https:cdn.carbonads.com/carbon.js?serve=CK7I62QM&placement=ceiphrcom`, `_carbonads_js`, window.document.getElementById(`carbonads__wrapper`));
    }

    // Cleanup; remove the script from the page
    return () => removeScript(`carbonads-script`, window.document.getElementById(`carbonads__wrapper`));
  }, [id]);

  return <div id={`carbonads__wrapper`} />
};

export default CarbonAds;