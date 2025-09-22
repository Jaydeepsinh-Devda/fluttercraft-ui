'use client'

interface PhoneMockupProps {
  iframeUrl: string
  componentTitle: string
}

export default function PhoneMockup({ iframeUrl, componentTitle }: PhoneMockupProps) {
  return (
    <div className="phone-mockup-container">
      <div className="iphone-mockup">
        {/* iPhone 16 Pro Frame */}
        <div className="iphone-frame">
          {/* Dynamic Island */}
          <div className="dynamic-island"></div>
          
          {/* Screen */}
          <div className="iphone-screen">
            <iframe
              src={iframeUrl}
              width="100%"
              height="100%"
              title={`${componentTitle} Preview`}
              loading="lazy"
              className="component-iframe"
            />
          </div>
          
          {/* Side Buttons */}
          <div className="side-button volume-up"></div>
          <div className="side-button volume-down"></div>
          <div className="side-button power-button"></div>
        </div>
        
        {/* Device Info */}
        {/* <div className="device-info">
          <div className="device-name">iPhone 16 Pro</div>
          <div className="device-specs">6.3" Super Retina XDR</div>
        </div> */}
      </div>
    </div>
  )
}
