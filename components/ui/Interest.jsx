import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
export default function Interest(props) {
  const [selected, setSelected] = React.useState(props.selected); // Initialize with the parent's selection

  const handleInterestClick = () => {
    if (selected) {
      // If the interest is already selected, deselect it
      setSelected(false);
      props.onSelect(props.name, false); // Notify the parent component
    } else {
      // If the interest is not selected, select it
      setSelected(true);
      props.onSelect(props.name, true); // Notify the parent component
    }
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 320,
        margin: "1rem",
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        backgroundColor: selected ? 'primary.main' : 'inherit', // Apply highlighting
        color: selected ? 'common.white' : 'inherit', // Apply text color
      }}
      onClick={handleInterestClick}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
      <Image src={props.image} sx={{}} width={300} height={350} alt={"image"} />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {props.name}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {props.desc}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
