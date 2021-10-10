import { Component, OnInit } from "@angular/core";
import { Skill } from "./interfaces/skill.interface";

@Component({
  selector: "section-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.css"],
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];

  constructor() {}

  ngOnInit(): void {
    this.skills = [
      { label: "Flutter", value: 80 },
      { label: "Angular", value: 70 },
      { label: "MySQL", value: 60 },
      { label: "PHP", value: 60 },
      { label: "Android", value: 50 },
      { label: "JavaScript", value: 50 },
      { label: "Python", value: 50 },
      { label: "Git", value: 30 },
      { label: "Java", value: 30 },
    ];
  }
}
