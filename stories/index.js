import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Example, { Web, HomeModule, NoneModule } from '../example/index';

Object.keys(Example).map((curKey) => {
  const curExample = Example[curKey];
  const story = storiesOf(curKey, module);
  Object.keys(curExample).map((storyKey) => {
    const CurComponent = curExample[storyKey];
    story.add(storyKey, () => <CurComponent />);
  });
});

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
