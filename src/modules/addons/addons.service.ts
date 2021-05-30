import { Inject, Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { ADDON_REPOSITORY } from '../../core/constants';
import { Addon } from './entities/addon.entity';

@Injectable()
export class AddOnsService {
  constructor(
    @Inject(ADDON_REPOSITORY) private addonRepository: typeof Addon,
  ) {}
  async create(createAddonDto: CreateAddonDto): Promise<Addon> {
    return this.addonRepository.create<Addon>(createAddonDto);
  }

  async findAddOns(): Promise<Addon[]> {
    return this.addonRepository.findAll<Addon>();
  }

  async update(
    id: string,
    updateAddonDto: UpdateAddonDto,
  ): Promise<[number, Addon[]]> {
    return this.addonRepository.update<Addon>(updateAddonDto, {
      where: { id },
    });
  }

  async remove(id: string): Promise<number> {
    return this.addonRepository.destroy<Addon>({ where: { id } });
  }
}
