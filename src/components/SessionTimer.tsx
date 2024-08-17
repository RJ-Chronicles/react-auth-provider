import useSessionExpirationWarning from "../session/useSessionExpirationWarning";

const SessionTimer = () => {
  const { msg } = useSessionExpirationWarning();

  return (
    <div>
      <p>{msg}</p>
    </div>
  );
};

export default SessionTimer;
