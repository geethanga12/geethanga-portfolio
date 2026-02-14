import { Router } from 'express';
import { CASE_STUDIES } from '../data/caseStudies.js';

export const projectsRouter = Router();

projectsRouter.get('/:slug', (req, res) => {
  const item = CASE_STUDIES.find((study) => study.slug === req.params.slug);
  if (!item) {
    res.status(404).json({ ok: false, message: 'Project case study not found.' });
    return;
  }
  res.json({ ok: true, data: item });
});
