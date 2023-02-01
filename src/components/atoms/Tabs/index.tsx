import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';
import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface ITabItem {
  title: string;
  content: ReactNode;
  value: string;
  disabled?: boolean;
}

interface ITabProps {
  items: ITabItem[];
  label: string;
}

const Tabs = ({ items, label }: ITabProps) => (
  <Root className={styles.tabsRoot} defaultValue={items[0].value}>
    <List className={styles.tabsList} aria-label={label}>
      {items.map(item => (
        <Trigger
          key={`${item.value}-title`}
          className={styles.tabsTrigger}
          value={item.value}
          disabled={item.disabled}
        >
          {item.title}
        </Trigger>
      ))}
    </List>

    {items.map(item => (
      <Content
        key={`${item.value}-content`}
        className={styles.tabsContent}
        value={item.value}
      >
        {item.content}
      </Content>
    ))}
  </Root>
);

export default Tabs;
