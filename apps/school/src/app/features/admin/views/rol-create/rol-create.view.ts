import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolsHttp } from '../../common/http/rols.http';
import { RolDTO } from '../../domain/dto/rol.dto';

@Component({
  templateUrl: './rol-create.view.html',
  styleUrls: ['./rol-create.view.scss']
})
export class RolCreateView implements OnInit {

  constructor(
    private rolsHttp: RolsHttp,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  save(rolFormValue: RolDTO) {
    this.rolsHttp.create(rolFormValue)
    .subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route })
    })
  }
}
