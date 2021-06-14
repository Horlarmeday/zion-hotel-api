import { Inject, Injectable } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { ADDON_REPOSITORY } from '../../core/constants';
import { Addon } from './entities/addon.entity';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { QueryDto } from '../../core/pipes/query-dto';
import { Op } from 'sequelize';

@Injectable()
export class AddOnsService {
  constructor(
    @Inject(ADDON_REPOSITORY) private addonRepository: typeof Addon,
    private readonly generalHelper: GeneralHelpers,
  ) {}
  async create(createAddonDto: CreateAddonDto): Promise<Addon> {
    return this.addonRepository.create<Addon>(createAddonDto);
  }

  async findAddOns(
    queryDto: QueryDto,
  ): Promise<{
    total: any;
    pages: number;
    perPage: number;
    docs: any;
    currentPage: number;
  }> {
    let addons;
    const { currentPage, pageLimit, search } = queryDto;

    const { limit, offset } = this.generalHelper.getPagination(
      +currentPage,
      +pageLimit,
    );

    if (search) {
      addons = await this.searchAddons(search, limit, offset);
    } else {
      addons = await this.getAddons(limit, offset);
    }

    return this.generalHelper.paginate(addons, currentPage, limit);
  }

  async searchAddons(search: string, limit: number, offset: number) {
    return await this.addonRepository.findAndCountAll<Addon>({
      limit: limit,
      offset: offset,
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
  }

  async getAddons(limit: number, offset: number) {
    return await this.addonRepository.findAndCountAll<Addon>({
      limit: limit,
      offset: offset,
    });
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
