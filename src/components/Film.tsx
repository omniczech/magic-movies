import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const Film = ({
  film,
}: {
  film: { name: string; actors: string[]; potential?: boolean };
}) => {
  return (
    <Accordion>
      <AccordionSummary>
        <p className="font-bold text-2xl">
          {film.name} ({film.actors.length}
          {film.potential ? "*" : ""})
        </p>
      </AccordionSummary>
      <AccordionDetails>
        {film.actors.map((actor: string) => (
          <p key={actor}>{actor}</p>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default Film;
