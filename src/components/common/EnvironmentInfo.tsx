import env, { isDev, isProd, isStaging } from '../../config/env';

interface EnvironmentInfoProps {
  className?: string;
}

/**
 * A component that displays the current environment information
 */
export const EnvironmentInfo: React.FC<EnvironmentInfoProps> = ({ className = '' }) => {
  return (
    <div className={`environment-info ${className}`}>
      <h3>Environment Information</h3>
      <ul>
        <li>
          <strong>Environment:</strong> {env.NODE_ENV}
          {isDev && <span className="badge dev">DEV</span>}
          {isStaging && <span className="badge staging">STAGING</span>}
          {isProd && <span className="badge prod">PROD</span>}
        </li>
        <li>
          <strong>API URL:</strong> {env.API_URL}
        </li>
        <li>
          <strong>Port:</strong> {env.PORT}
        </li>
      </ul>
    </div>
  );
};

export default EnvironmentInfo;
