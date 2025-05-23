import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MdSecurity, MdVerified } from 'react-icons/md'

const FraudBadge = ({ isFraud, details }) => {
  return (
    <Badge 
      bg={isFraud ? 'danger' : 'success'} 
      className="d-flex align-items-center gap-2 py-2 px-3"
      pill
    >
      {isFraud ? (
        <>
          <MdSecurity className="fs-5" />
          <span>{details || 'Fraude'}</span>
        </>
      ) : (
        <>
          <MdVerified className="fs-5" />
          <span>{details || 'Legítima'}</span>
        </>
      )}
    </Badge>
  );
};

export default FraudBadge