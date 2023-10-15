import Title from '@public/webdoor/webdoor-title.svg';
import webdoorTitleStyles from './webdoorTitle.module.scss';

export type WebDoorTitlePositionXOptions = 'left' | 'center' | 'right';
export type WebDoorTitlePositionYOptions = 'top' | 'center' | 'bottom';

interface WebDoorTitleProps {
  positionX?: WebDoorTitlePositionXOptions;
  positionY?: WebDoorTitlePositionYOptions;
}

const WebDoorTitle = ({
  positionX = 'center',
  positionY = 'top',
}: WebDoorTitleProps): JSX.Element => {
  const title = 'Find everything about the creatures you love!';

  return (
    <div
      className={`${webdoorTitleStyles.titleContainer} ${
        webdoorTitleStyles[`positionX-${positionX}`]
      } ${webdoorTitleStyles[`positionY-${positionY}`]}`}
    >
      <h1 className={`${webdoorTitleStyles.title}`} aria-labelledby="title">
        <span
          id="title"
          style={{
            opacity: 0.01,
            userSelect: 'none',
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          aria-hidden="true"
        >
          {title}
        </span>

        <Title />
      </h1>
    </div>
  );
};

export default WebDoorTitle;
