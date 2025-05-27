import type { ComponentType } from 'react';
import { useParams } from 'react-router-dom';

// No longer need the old context providers since we're using Zustand

function withAppHocs<T>(ChildComponent: React.ComponentType<T>) {
  return (props: React.PropsWithChildren<T>) => (
    // No more context providers needed - Zustand is global
    <ChildComponent {...props} />
  );
}

export default function withMainAppHocs<T>(ChildComponent: ComponentType<T>) {
  const ComponentWithHocs = withAppHocs(ChildComponent);

  return (props: T) => {
    const params = useParams();
    return <ComponentWithHocs {...props} {...params} />;
  };
}
