"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_projects_dto_1 = require("./dto/query-projects.dto");
getFeaturedProjects(, query, query_projects_dto_1.QueryProjectsDto);
{
    return this.projectsService.findAll({ ...query, featured: true, status: 'published' });
}
getProjectsByCategory(, category, string, , query, query_projects_dto_1.QueryProjectsDto);
{
    return this.projectsService.findAll({ ...query, category: category, status: 'published' });
}
//# sourceMappingURL=projects.controller.bak.js.map