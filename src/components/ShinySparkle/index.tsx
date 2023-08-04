import { motion } from 'framer-motion';
import SparkleIcon1 from '@public/webdoor/sparkle-1.svg';
import SparkleIcon2 from '@public/webdoor/sparkle-2.svg';
import SparkleIcon3 from '@public/webdoor/sparkle-3.svg';
import SparkleIcon4 from '@public/webdoor/sparkle-4.svg';

const Header = (): JSX.Element => {
  return (
    <div>
      <div>
        <SparkleIcon1 />
      </div>
      <div>
        <SparkleIcon2 />
      </div>
      <div>
        <SparkleIcon3 />
      </div>
      <div>
        <SparkleIcon4 />
      </div>
    </div>
  );
};

export default Header;
