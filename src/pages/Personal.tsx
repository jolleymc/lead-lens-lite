import { PageHeading } from '@/components/PageHeading';

const Personal = () => {
  return (
    <div className="min-h-screen px-6 py-14 md:px-14 md:py-20 animate-fade-in">
      <div className="max-w-2xl">
        <PageHeading
          eyebrow="~/portfolio/personal"
          title="Beyond Work"
          subline="A little about who I am outside of the resume"
        />

        <p className="text-sm leading-7 text-muted-foreground max-w-xl">
          Still building this page out — hobbies, my band, and the rest of the non-work stuff
          are coming soon. Check back shortly.
        </p>
      </div>
    </div>
  );
};

export default Personal;
