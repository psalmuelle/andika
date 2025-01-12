import Typography from "../ui/typography";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Typography as={"p"} className="mt-8 text-center text-sm">
        © {currentYear} Andika
      </Typography>
    </footer>
  );
}
