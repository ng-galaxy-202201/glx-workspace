import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolsHttp } from '../../common/http/rols.http';
import { RolDTO } from '../../domain/dto/rol.dto';
import { RolWithPermission } from '../../domain/models/rol-permission.model';

@Component({
  templateUrl: './rol-update.view.html',
  styleUrls: ['./rol-update.view.scss']
})
export class RolUpdateView implements OnInit {
  id: number;
  rol?: RolWithPermission;

  constructor(
    private rolsHttp: RolsHttp,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.rolsHttp.getOne(this.id)
      .subscribe(rol => this.rol = rol)
  }

  save(rolFormValue: RolDTO) {
    this.rolsHttp.update(this.id, rolFormValue)
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.route })
      })
  }
}
