import { AvatarFallback, AvatarImage, AvatarRoot } from '@noksha-ui/react';

export default function AvatarBasic() {
  return (
    <>
      <AvatarRoot size="sm">
        <AvatarImage src="https://i.pravatar.cc/120?img=12" alt="Ada Lovelace" />
        <AvatarFallback>AL</AvatarFallback>
      </AvatarRoot>

      <AvatarRoot size="md">
        <AvatarImage src="https://i.pravatar.cc/120?img=32" alt="Grace Hopper" />
        <AvatarFallback>GH</AvatarFallback>
      </AvatarRoot>

      <AvatarRoot size="lg" shape="rounded">
        <AvatarImage src="https://i.pravatar.cc/120?img=52" alt="Katherine Johnson" />
        <AvatarFallback>KJ</AvatarFallback>
      </AvatarRoot>

      {/* No src: the fallback is all that renders, with no flash of a broken image. */}
      <AvatarRoot size="lg">
        <AvatarFallback>PU</AvatarFallback>
      </AvatarRoot>
    </>
  );
}
